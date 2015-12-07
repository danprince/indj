import config from '../config';

export function sanitizeTitle(title) {
  const cleaned = title
    // remove obvious things
    .replace(/[\|"']/g, '')
    // remove bracketed text
    .replace(/\s*\(.*?\)\s*/g, '');

  const sanityTerms = config.SANITY_TERMS;

  const sane = sanityTerms.reduce((title, word) => {
    return title
      .replace(word, '')
      .replace(word.toUpperCase())
      .replace(word.toLowerCase());
  }, cleaned);

  sane.replace(/\s+/g, ' ');

  if(sane.indexOf('-')) {
    const [author, title] = sane.split('-');

    return { author, title };
  } else {
    return { title: sane };
  }
}

