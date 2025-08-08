"use client";

import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay } from "@mantine/core";

const LoadingPage = () => {
  const [visible, { toggle }] = useDisclosure(true);
  return (
    <div>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </div>
  );
};

export default LoadingPage;
