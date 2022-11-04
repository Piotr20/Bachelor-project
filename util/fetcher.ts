export const fetcher = (resource: RequestInfo | URL, init: any) =>
    fetch(resource, init).then((res) => res.json());
