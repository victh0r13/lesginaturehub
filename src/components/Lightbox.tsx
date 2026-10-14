"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";
import { flushSync } from "react-dom";
import { ChevronIcon, CloseIcon } from "@/components/icons";

export type GalleryPhoto = { src: string; width: number; height: number; alt: string };
export type Gallery = { title: string; photos: GalleryPhoto[] };

type View = { gallery: string; start: number; morph: boolean };

// Shared view-transition name: the thumbnail and the enlarged photo morph into each other.
const MORPH = "lightbox-photo";
const CLOSE_DISTANCE = 120;
const ZOOM = 2.2;

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => matchMedia("(pointer: fine)").matches;
const canMorph = () => typeof document.startViewTransition === "function" && !reducedMotion();
const pad = (n: number) => String(n).padStart(2, "0");

function thumbnail(gallery: string, index: number) {
  return document.querySelector<HTMLElement>(`[data-gallery="${gallery}"][data-index="${index}"]`);
}

export function Lightbox({ galleries }: { galleries: Record<string, Gallery> }) {
  const [view, setView] = useState<View | null>(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; axis: "x" | "y" | null; dy: number } | null>(null);

  // Photo buttons are server-rendered; open from any of them via delegation.
  useEffect(() => {
    const onClick = (event: globalThis.MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>("[data-gallery]");
      const key = trigger?.dataset.gallery;
      if (!trigger || !key || !galleries[key]) return;

      const start = Number(trigger.dataset.index);
      const thumb = trigger.querySelector("img");
      const morph = canMorph() && thumb !== null;
      const open = () =>
        flushSync(() => {
          setView({ gallery: key, start, morph });
          setIndex(start);
          setZoomed(false);
        });

      if (!morph) return open();
      thumb.style.viewTransitionName = MORPH;
      document.startViewTransition(() => {
        thumb.style.viewTransitionName = "";
        open();
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [galleries]);

  // Land on the clicked photo before the first paint.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (view && track) track.scrollTo({ left: view.start * track.clientWidth, behavior: "instant" });
  }, [view]);

  useEffect(() => {
    if (!view) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = "";
    };
  }, [view]);

  const gallery = view ? galleries[view.gallery] : null;
  if (!view || !gallery) return null;

  const photos = gallery.photos;
  const total = photos.length;

  function close() {
    if (!view) return;
    // Return to the photo currently shown, which may differ from the one clicked.
    const trigger = thumbnail(view.gallery, index);
    const thumb = trigger?.querySelector("img");
    const restoreFocus = () => trigger?.focus({ preventScroll: true });

    setZoomed(false);
    if (!canMorph() || !thumb) {
      flushSync(() => setView(null));
      return restoreFocus();
    }
    const transition = document.startViewTransition(() => {
      flushSync(() => setView(null));
      thumb.style.viewTransitionName = MORPH;
    });
    transition.finished.finally(() => {
      thumb.style.viewTransitionName = "";
      restoreFocus();
    });
  }

  function go(step: number) {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.min(Math.max(index + step, 0), total - 1);
    track.scrollTo({ left: next * track.clientWidth, behavior: reducedMotion() ? "instant" : "smooth" });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.round(track.scrollLeft / track.clientWidth);
    if (next !== index) {
      setIndex(next);
      setZoomed(false);
    }
  }

  // Desktop magnifier: click to zoom in, move the mouse to pan, click again to zoom out.
  function toggleZoom(event: MouseEvent<HTMLImageElement>) {
    if (!finePointer()) return;
    pan(event);
    setZoomed((value) => !value);
  }

  function pan(event: MouseEvent<HTMLImageElement>) {
    const img = event.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (zoomed) setZoomed(false);
      else close();
    }
    else if (event.key === "ArrowRight") go(1);
    else if (event.key === "ArrowLeft") go(-1);
    else if (event.key === "Tab") {
      // Keep focus inside the dialog.
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled)") ?? []);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  }

  // Swipe down to dismiss on touch screens; horizontal swipes scroll the track natively.
  function setDrag(dy: number, animate = false) {
    const stage = stageRef.current;
    const dialog = dialogRef.current;
    if (!stage || !dialog) return;
    const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
    stage.style.transition = animate ? `transform 0.45s ${ease}` : "none";
    stage.style.transform = dy ? `translateY(${dy}px) scale(${1 - Math.min(dy / 1600, 0.12)})` : "";
    dialog.style.setProperty("--lightbox-fade", String(1 - Math.min(dy / 480, 0.7)));
    dialog.style.setProperty("--lightbox-fade-transition", animate ? `opacity 0.45s ${ease}` : "none");
  }

  function onTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    dragRef.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY, axis: null, dy: 0 } : null;
  }

  function onTouchMove(event: TouchEvent) {
    const drag = dragRef.current;
    if (!drag) return;
    const touch = event.touches[0];
    const dx = touch.clientX - drag.x;
    const dy = touch.clientY - drag.y;
    if (!drag.axis && Math.hypot(dx, dy) > 10) drag.axis = Math.abs(dy) > Math.abs(dx) ? "y" : "x";
    if (drag.axis !== "y") return;
    drag.dy = Math.max(dy, 0);
    setDrag(drag.dy);
  }

  function onTouchEnd() {
    const drag = dragRef.current;
    dragRef.current = null;
    if (drag?.axis !== "y") return;
    if (drag.dy > CLOSE_DISTANCE) close();
    else setDrag(0, true);
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Fotos do consultório ${gallery.title}`}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className={`fixed inset-0 z-[60] flex flex-col outline-none ${view.morph ? "" : "lightbox-in"}`}
    >
      <div aria-hidden onClick={close} className="lightbox-fade absolute inset-0 bg-background/95 backdrop-blur-md" />

      <header className="lightbox-fade relative flex items-center justify-between gap-4 px-6 pt-[max(1rem,env(safe-area-inset-top))] pb-4 lg:px-10 lg:pt-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground lg:text-[11px]">Consultório</p>
          <p className="font-display text-2xl font-semibold italic leading-tight lg:text-3xl">{gallery.title}</p>
        </div>
        <div className="flex items-center gap-5">
          <p aria-live="polite" className="text-[11px] tabular-nums tracking-widest text-muted-foreground">
            <span className="sr-only">Foto </span>
            <span className="text-foreground">{pad(index + 1)}</span> / {pad(total)}
          </p>
          <button
            data-autofocus
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card/70 transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
      </header>

      <div aria-hidden className="lightbox-fade relative flex gap-1.5 px-6 lg:px-10">
        {photos.map((photo, i) => (
          <span
            key={photo.src}
            className={`h-px flex-1 transition-colors duration-500 ${i === index ? "bg-accent" : "bg-foreground/15"}`}
          />
        ))}
      </div>

      <div ref={stageRef} className="relative min-h-0 flex-1">
        <div
          ref={trackRef}
          onScroll={onScroll}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          className="lightbox-track flex h-full snap-x snap-mandatory overflow-x-auto overscroll-contain"
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              onClick={(event) => event.target === event.currentTarget && close()}
              className="flex h-full w-full shrink-0 snap-center items-center justify-center overflow-hidden px-4 py-5 lg:px-28 lg:py-6"
            >
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                sizes="100vw"
                draggable={false}
                onClick={toggleZoom}
                onMouseMove={zoomed && i === index ? pan : undefined}
                style={{
                  viewTransitionName: i === index ? MORPH : undefined,
                  transform: zoomed && i === index ? `scale(${ZOOM})` : undefined,
                }}
                className={`h-auto max-h-full w-auto max-w-full select-none rounded-sm object-contain shadow-2xl shadow-primary/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  zoomed && i === index ? "cursor-zoom-out" : "pointer-fine:cursor-zoom-in"
                }`}
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <ArrowButton direction="prev" disabled={index === 0} onClick={() => go(-1)} />
            <ArrowButton direction="next" disabled={index === total - 1} onClick={() => go(1)} />
          </>
        )}
      </div>

      <div className="lightbox-fade relative px-6 pt-1 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center lg:pb-8">
        <p className="mx-auto max-w-[48ch] text-pretty text-sm text-muted-foreground">{photos[index].alt}</p>
        <p className="mt-2 hidden text-[10px] uppercase tracking-widest text-muted-foreground/70 lg:block">
          {zoomed ? "Mova o mouse para explorar · clique para afastar" : "Clique na foto para aproximar"}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground/70 lg:hidden">
          {total > 1 ? "Deslize para navegar · puxe para baixo para fechar" : "Puxe para baixo para fechar"}
        </p>
      </div>
    </div>
  );
}

function ArrowButton({ direction, disabled, onClick }: { direction: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  const prev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={prev ? "Foto anterior" : "Próxima foto"}
      className={`lightbox-fade absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm transition-[background-color,color,opacity] hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:!opacity-0 lg:flex ${
        prev ? "left-8" : "right-8"
      }`}
    >
      <ChevronIcon className={`size-5 ${prev ? "rotate-180" : ""}`} />
    </button>
  );
}
