type Listener = (event: MediaQueryListEvent) => void;

let systemDark = false;
const listeners = new Set<Listener>();

export function installMatchMedia() {
  systemDark = false;
  listeners.clear();

  window.matchMedia = (query: string) =>
    ({
      media: query,
      get matches() {
        return systemDark;
      },
      addEventListener: (_type: string, listener: Listener) => listeners.add(listener),
      removeEventListener: (_type: string, listener: Listener) => listeners.delete(listener),
    }) as unknown as MediaQueryList;
}

export function setSystemDark(dark: boolean) {
  systemDark = dark;
  listeners.forEach((listener) => listener({ matches: dark } as MediaQueryListEvent));
}
