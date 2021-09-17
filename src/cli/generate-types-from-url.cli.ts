#!/usr/bin/env node

import { validateArguments } from '../logic/cli/args/validate-arguments';
import {
  reportError,
  reportSuccess,
} from '../logic/cli/console/console.messages';
import { generateTypesFromUrl } from '../workflows/generate-types-from-url';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const args = validateArguments();

    await generateTypesFromUrl(args);

    reportSuccess();
    process.exit(0);
  } catch (err) {
    reportError(err);
    process.exit(1);
  }
})();
