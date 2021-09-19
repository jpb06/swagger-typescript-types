import { createProject, ts } from '@ts-morph/bootstrap';
import { Diagnostic } from '@ts-morph/common/lib/typescript';

export const transpileRaw = async (raw: string): Promise<Array<Diagnostic>> => {
  const project = await createProject({ useInMemoryFileSystem: true });
  project.createSourceFile('interfaces.ts', raw);
  const program = project.createProgram();

  const diagnostics = ts.getPreEmitDiagnostics(program);
  return diagnostics as Array<Diagnostic>;
};
