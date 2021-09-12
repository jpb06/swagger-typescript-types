import { createProject, ts } from '@ts-morph/bootstrap';

export const transpileRaw = async (raw: string) => {
  const project = await createProject({ useInMemoryFileSystem: true });
  project.createSourceFile('interfaces.ts', raw);
  const program = project.createProgram();
  return ts.getPreEmitDiagnostics(program);
};
