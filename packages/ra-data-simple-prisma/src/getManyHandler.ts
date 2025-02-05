import { GetManyRequest, Response } from "./Http";

export type GetManyArgs = {
  include?: object | null;
  select?: object | null;
};

export type GetManyOptions<Args extends GetManyArgs = GetManyArgs> = {
  debug?: boolean;
  include?: Args["include"];
  select?: Args["select"];
  transform?: (data: any) => any;
};

export const getManyHandler = async <Args extends GetManyArgs>(
  req: GetManyRequest,
  res: Response,
  model: { findMany: Function },
  options?: GetManyOptions<Args>
) => {
  const { ids } = req.body.params;

  // GET DATA
  const data = await model.findMany({
    include: options?.include,
    select: options?.select,
    where: { id: { in: ids } },
  });

  // TRANSFORM
  await options?.transform?.(data);

  res.json({ data });
};
