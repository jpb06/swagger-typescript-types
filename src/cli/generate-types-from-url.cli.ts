#!/usr/bin/env node

import { generateTypesFromUrl } from '../workflows/generate-types-from-url';
import { reportError, reportSuccess } from './logic/console.messages';
import { validateArguments } from './logic/validate-arguments';

/* istanbul ignore file */

(async () => {
  try {
    const { sourceUrl, outPath } = validateArguments();
    await generateTypesFromUrl(sourceUrl, outPath);
    reportSuccess(outPath);
    process.exit(0);
  } catch (err) {
    reportError(err);
    process.exit(1);
  }
})();
