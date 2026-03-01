// 🔥 VISUAL UPGRADED VERSION (SAFE)

import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Switch,
  Text,
  Textarea,
  usePrefersReducedMotion,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import AppCredits from "./AppCredits";
import { showAppToast } from "./appToast.jsx";

/* --- everything above unchanged --- */

export default function CheckerPage(props) {
  const {
    input,
    uploadedInputBanner,
    isLoading,
    checkLogs,
    checkLogRef,
    workerCount,
    progressBarStyle,
    isProgressIndeterminate,
    uploadInputRef,
    filePickerAccept,
    minWorkerCount,
    maxWorkerCount,
    runCheck,
    stopCheck,
    handleCookieInputChange,
    decrementWorkerCount,
    incrementWorkerCount,
    openUploadPicker,
    handleUploadFile,
    checkNFToken,
    toggleCheckNFToken,
    singleCheckModalResult,
    onCloseSingleCheckModal,
  } = props;

  const toast = useToast();
  const prefersReducedMotion = usePrefersReducedMotion();
  const showUploadedFileMarker = Boolean(uploadedInputBanner);
  const isSingleResultModalOpen = Boolean(singleCheckModalResult);

  const hoverLift = prefersReducedMotion ? {} : { transform: "translateY(-1px)" };

  return (
    <Box
      as="main"
      h="100dvh"
      minH="100dvh"
      overflowX="hidden"
      overflowY="auto"
      bg="linear-gradient(180deg, #0b0e17 0%, #0f1424 100%)"
      color="#ffffff"
    >
      <Box mx="auto" h="100%" w="full" px={{ base: 2, sm: 3 }} py={{ base: 2, sm: 3 }}>
        <Grid h="full" minH={0} templateRows="minmax(0,1fr) auto" gap={3}>
          <Box
            as={motion.section}
            borderRadius="24px"
            borderWidth="1px"
            borderColor="rgba(255,255,255,0.06)"
            bg="linear-gradient(145deg, #151a2f 0%, #101425 100%)"
            boxShadow="0 25px 70px rgba(0,0,0,0.65)"
            overflow="hidden"
          >
            <Flex direction="column" h="full">
              {/* HEADER */}
              <Grid
                minH="40px"
                templateColumns="2.5rem 1fr 2.5rem"
                alignItems="center"
                borderBottomWidth="1px"
                borderBottomColor="rgba(255,255,255,0.06)"
                bg="rgba(20, 24, 45, 0.65)"
                backdropFilter="blur(8px)"
                px={3}
              >
                <HStack spacing={1.5}>
                  <Circle size="10px" bg="#ff8a3d" />
                  <Circle size="10px" bg="#23d7c6" />
                  <Circle size="10px" bg="#ff6584" />
                </HStack>

                <Text
                  textAlign="center"
                  fontSize="xs"
                  fontWeight="700"
                  letterSpacing="0.06em"
                  color="#ff8a3d"
                >
                  ~fyodor :: cookie-checker
                </Text>
                <Box />
              </Grid>

              {/* FORM */}
              <Box as="form" onSubmit={runCheck} flex="1" p={4} display="grid" gap={3}>
                <Box borderRadius="16px" position="relative">
                  {!isLoading ? (
                    <Textarea
                      value={input}
                      onChange={handleCookieInputChange}
                      placeholder="$ paste netscape blocks, json cookie data, or raw/header cookie strings"
                      resize="none"
                      h="100%"
                      borderRadius="16px"
                      borderWidth="1px"
                      borderColor="rgba(255,255,255,0.1)"
                      bg="linear-gradient(145deg, #0f1426 0%, #0c1020 100%)"
                      boxShadow="inset 0 0 25px rgba(0,0,0,0.45)"
                      color="#ffffff"
                      _hover={{
                        borderColor: "rgba(255,138,61,0.58)",
                        bg: "rgba(20,24,45,0.8)",
                      }}
                      _focusVisible={{
                        borderColor: "rgba(255,138,61,0.78)",
                        boxShadow: "0 0 0 1px rgba(255,138,61,0.44)",
                        bg: "rgba(20,24,45,0.9)",
                      }}
                    />
                  ) : (
                    <Box
                      ref={checkLogRef}
                      h="100%"
                      overflow="auto"
                      borderRadius="16px"
                      borderWidth="1px"
                      borderColor="rgba(255,255,255,0.1)"
                      bg="linear-gradient(145deg, #0f1426 0%, #0c1020 100%)"
                      boxShadow="inset 0 0 25px rgba(0,0,0,0.45)"
                      p={4}
                    >
                      {checkLogs.map((entry) => (
                        <Text key={entry.id}>{entry.text}</Text>
                      ))}
                    </Box>
                  )}
                </Box>

                {/* PROGRESS BAR */}
                <Box
                  position="relative"
                  h="8px"
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor="rgba(255,255,255,0.1)"
                  bg="rgba(20,24,45,0.6)"
                >
                  <Box
                    position="absolute"
                    insetY={0}
                    left={0}
                    borderRadius="full"
                    bg="linear-gradient(90deg, #ff8a3d, #ff6a00)"
                    boxShadow="0 0 14px rgba(255,138,61,0.65)"
                    w={isProgressIndeterminate ? "28%" : progressBarStyle?.width || "0%"}
                  />
                </Box>

                {/* BUTTONS */}
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  <Input
                    ref={uploadInputRef}
                    type="file"
                    accept={filePickerAccept}
                    display="none"
                    onChange={(event) => void handleUploadFile(event)}
                  />

                  <Button
                    type="submit"
                    minH="2.8rem"
                    borderRadius="12px"
                    borderWidth="1px"
                    borderColor="rgba(255,138,61,0.78)"
                    bg="linear-gradient(135deg, #ff8a3d, #ff6a00)"
                    boxShadow="0 0 20px rgba(255,138,61,0.45)"
                    color="#ffffff"
                    fontWeight="700"
                    _hover={{
                      bg: "linear-gradient(135deg, #ff9b55, #ff7a1a)",
                      boxShadow: "0 0 24px rgba(255,138,61,0.75)",
                      ...hoverLift,
                    }}
                  >
                    {isLoading ? "Stop" : "Start"}
                  </Button>

                  <Button
                    type="button"
                    onClick={openUploadPicker}
                    minH="2.8rem"
                    borderRadius="12px"
                    borderWidth="1px"
                    borderColor="rgba(255,255,255,0.12)"
                    bg="rgba(20,24,45,0.6)"
                    backdropFilter="blur(6px)"
                    color="#ffffff"
                    _hover={{ bg: "rgba(255,255,255,0.08)", ...hoverLift }}
                  >
                    Upload File
                  </Button>
                </Grid>
              </Box>
            </Flex>
          </Box>

          <AppCredits />
        </Grid>
      </Box>
    </Box>
  );
}
