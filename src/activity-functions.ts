
export function prefix(location, ...prefixes) {
  return prefixes.some(
    (prefix) => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  );
}

export function login(location:Location):boolean {
  return location.pathname === "/";
}

// export function home(location) {
//   return prefix(location, "home");
// }
