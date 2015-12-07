import { sanitizeTitle } from './util/sanitize';

const cache = {};

export function makeUrl(url) {
  return `http://noembed.com/embed?url=${url}`;
}

export function getMeta(url) {
  const metaUrl = makeUrl(url),
        isCached = url in cache;

  if(isCached) {
    return new Promise(resolve => resolve(cache[url]));
  }

  return fetch(metaUrl)
    .then(res => res.json())
    .then(meta => extractDetails(url, meta))
    .then(meta => cacheMetaPromise(url, meta));
}

export function cacheMeta(url, meta) {
  return cache[url] = meta;
}

export function cacheMetaPromise(...args) {
  return new Promise(resolve => resolve(cacheMeta(...args)));
}

export function extractDetails(url, meta) {
  console.log(url, meta);
  const { author, title } = sanitizeTitle(meta.title);

  meta.author = author;
  meta.title = title;

  return new Promise(resolve => resolve(meta));
}

