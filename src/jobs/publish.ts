import {
  type ProductService,
  type ScheduledJobConfig,
  type ScheduledJobArgs,
  ProductStatus,
} from "@medusajs/medusa";

export default async function handler({
  container,
  data,
  pluginOptions,
}: ScheduledJobArgs) {
  const productService: ProductService = container.resolve("productService");
  const draftProducts = await productService.list({
    status: ProductStatus.DRAFT,
  });

  for (const product of draftProducts) {
    await productService.update(product.id, {
      status: ProductStatus.PUBLISHED,
    });
  }
}

export const config: ScheduledJobConfig = {
  name: "publish-once-a-day",
  schedule: "0 0 * * *",
  data: {},
};
