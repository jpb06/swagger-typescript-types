#!/usr/bin/env node

import {
  displayError,
  displaySuccess,
} from '../logic/cli/console/console.messages';
import { generateTypesFromUrl } from '../workflows/generate-types-from-url';
import { validateUrlArguments } from './args/validate-url-arguments';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const args = validateUrlArguments();

    const generationResult = await generateTypesFromUrl(args);

    displaySuccess(args.outPath, generationResult);
    process.exit(0);
  } catch (err) {
    displayError(err);
    process.exit(1);
  }
})();
