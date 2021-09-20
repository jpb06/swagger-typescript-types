#!/usr/bin/env node

import { validateArguments } from '../logic/cli/args/validate-arguments';
import {
  displayError,
  displaySuccess,
} from '../logic/cli/console/console.messages';
import { generateTypesFromUrl } from '../workflows/generate-types-from-url';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const args = validateArguments();

    const generationResult = await generateTypesFromUrl(args);

    displaySuccess(args.outPath, generationResult);
    process.exit(0);
  } catch (err) {
    displayError(err);
    process.exit(1);
  }
})();
