import { z } from "zod";

export const documentUploadSchema = z.object({
  class10MarkSheet: z.instanceof(File),
  class12MarkSheet: z.instanceof(File),
});
