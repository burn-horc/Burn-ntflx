console.log("THIS FILE IS RUNNING");
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

function displayValue(value, fallback = "N/A") {
  if (value == null) return fallback;
  const text = String(value).trim();
  return text ? text : fallback;
}

function displayBoolean(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "N/A";
}

function readResultTokenLink(result) {
  const link = typeof result?.nftokenLink === "string" ? result.nftokenLink.trim() : "";
  return link || "";
}

async function copyTextToClipboard(value) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return false;

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback below
    }
  }

  if (typeof document !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }

    document.body.removeChild(textarea);
    return copied;
  }

  return false;
}

export default function CheckerPage({
  input,
  uploadedInputBanner,
  isLoading,
  checkLogs,
  checkLogRef,
  workerCount,
  checkProgress,
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
}) {
  const toast = useToast();
  const prefersReducedMotion = usePrefersReducedMotion();
  const showUploadedFileMarker = Boolean(uploadedInputBanner);
  const isSingleResultModalOpen = Boolean(singleCheckModalResult);
  const getLogToneColor = (tone) =>
    tone === "valid" ? "#23d7c6" : tone === "invalid" ? "#ff6584" : "rgba(255,255,255,0.82)";
  const easing = [0.22, 1, 0.36, 1];
  const fadeInUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.34, delay, ease: easing },
        };
  const hoverLift = prefersReducedMotion ? {} : { transform: "translateY(-1px)" };
  const handleAndroidCopy = async (link) => {
    const copied = await copyTextToClipboard(link);
    if (!copied) return;

    const toastId = "checker-single-android-link-copied";
    showAppToast(toast, {
      id: toastId,
      title: "Android link copied",
      status: "success",
      duration: 1600,
    });
  };
  const modalResult = singleCheckModalResult;
  const modalDetailItems = modalResult
    ? [
        ["Plan", modalResult?.plan],
        ["Country", modalResult?.countryOfSignup],
        ["Price", modalResult?.price],
        ["Membership", modalResult?.membershipStatus],
        ["Member Since", modalResult?.memberSince],
        ["Next Billing", modalResult?.nextBilling],
        ["Email", modalResult?.email],
        ["Email Verified", displayBoolean(modalResult?.emailVerified)],
        ["Phone", modalResult?.phone],
        ["Phone Verified", displayBoolean(modalResult?.phoneVerified)],
      ]
    : [];
  const modalSharedNfTokenLink = readResultTokenLink(modalResult);
  const modalAndroidLink = modalSharedNfTokenLink;
  const modalPcLink = modalSharedNfTokenLink;
  const modalHasPlatformLinks = Boolean(modalAndroidLink || modalPcLink);

  return (
  <Box
    as="main"
    h="100dvh"
    minH="100dvh"
    overflowX="hidden"
    overflowY="auto"
    bg="bg.900"
    color="fg.DEFAULT"
  >
    <Box
      mx="auto"
      h="100%"
      w="full"
      px={{ base: 3, sm: 4, lg: 6 }}
      py={{ base: 3, sm: 4 }}
    >
      <Grid h="full" minH={0} templateRows="minmax(0,1fr) auto" gap={5}>
        <Box
          as={motion.section}
          {...fadeInUp(0.02)}
          h="full"
          minH={0}
          borderRadius="30px"
          border="1px solid"
          borderColor="whiteAlpha.200"
          bg="surface.950"
          boxShadow="card"
          overflow="hidden"
        >
          <Flex h="full" direction="column" overflow="hidden">

            {/* HEADER */}
            <Grid
              minH="50px"
              templateColumns="2.5rem 1fr 2.5rem"
              alignItems="center"
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
              bg="surface.900"
              px={5}
            >
              <HStack spacing={2}>
                <Circle size="10px" bg="brand.400" />
                <Circle size="10px" bg="accent.400" />
                <Circle size="10px" bg="danger.300" />
              </HStack>

              <Text
                textAlign="center"
                fontSize="xs"
                fontWeight="800"
                letterSpacing="0.12em"
                color="brand.400"
              >
                BURN GENERATOR
              </Text>

              <Box />
            </Grid>

            {/* CONTENT */}
            <Box
              as="form"
              onSubmit={runCheck}
              display="grid"
              flex="1"
              minH={0}
              gridTemplateRows="minmax(0,1fr) auto auto auto"
              gap={5}
              p={{ base: 5 }}
            >
              {/* TEXT AREA */}
              <Box
                h="full"
                borderRadius="22px"
                bg="surface.900"
                border="1px solid"
                borderColor="whiteAlpha.200"
              >
                {!isLoading ? (
                  <Textarea
                    value={input}
                    onChange={handleCookieInputChange}
                    placeholder="$ paste netscape blocks, json cookie data, or raw/header cookie strings"
                    spellCheck={false}
                    h="100%"
                    resize="none"
                    borderRadius="22px"
                    border="none"
                    bg="transparent"
                    px={6}
                    py={5}
                    fontSize="sm"
                    fontFamily="'JetBrains Mono', monospace"
                    color="fg.DEFAULT"
                    _placeholder={{ color: "fg.muted" }}
                    _focusVisible={{
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                  />
                ) : (
                  <Box
                    ref={checkLogRef}
                    role="log"
                    aria-live="polite"
                    h="100%"
                    overflow="auto"
                    px={6}
                    py={5}
                    fontSize="sm"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {checkLogs.length === 0 ? (
                      <Text color="fg.muted">
                        Starting check...
                      </Text>
                    ) : (
                      checkLogs.map((entry) => (
                        <Text
                          key={entry.id}
                          mt={entry.id > 1 ? 2 : 0}
                          color={
                            entry.tone === "valid"
                              ? "accent.400"
                              : entry.tone === "invalid"
                              ? "danger.300"
                              : "fg.DEFAULT"
                          }
                          whiteSpace="pre-wrap"
                        >
                          {entry.text}
                        </Text>
                      ))
                    )}
                  </Box>
                )}
              </Box>

              {/* BUTTONS */}
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Button
                  type="submit"
                  onClick={(event) => {
                    if (!isLoading) return;
                    event.preventDefault();
                    stopCheck();
                  }}
                  minH="3.2rem"
                  borderRadius="16px"
                  bg="brand.400"
                  color="white"
                  fontWeight="800"
                  letterSpacing="0.1em"
                  _hover={{ bg: "brand.300" }}
                  _active={{ transform: "scale(0.97)" }}
                >
                  {isLoading ? "Stop" : "Start"}
                </Button>

                <Button
                  type="button"
                  onClick={openUploadPicker}
                  isDisabled={isLoading}
                  minH="3.2rem"
                  borderRadius="16px"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="fg.DEFAULT"
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
