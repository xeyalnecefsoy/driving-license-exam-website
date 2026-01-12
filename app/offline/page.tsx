import type { Metadata } from "next";
import { OfflineView } from "@/components/offline/OfflineView";

export const metadata: Metadata = {
  title: "İnternet Bağlantısı Yoxdur - Surol.az",
  description: "Zəhmət olmasa internet bağlantınızı yoxlayın.",
};

export default function OfflinePage() {
  return <OfflineView />;
}
