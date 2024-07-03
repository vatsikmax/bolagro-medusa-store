import { NotificationService } from "@medusajs/medusa";
import { AwilixContainer } from "awilix";

export default async (
  container: AwilixContainer,
  config: Record<string, unknown>
): Promise<void> => {
  const notificationService = container.resolve<NotificationService>(
    "notificationService"
  );

  notificationService.subscribe("order.placed", "email-sender");
};
