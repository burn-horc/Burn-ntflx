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
    bg="linear-gradient(180deg, #0b0e17 0%, #0f1424 100%)"
    color="#ffffff"
  >
    <Box
      mx="auto"
      h="100%"
      w="full"
      px={{ base: 2, sm: 3, lg: 4 }}
      py={{ base: 2, sm: 3 }}
    >
      <Grid h="full" minH={0} templateRows="minmax(0,1fr) auto" gap={4}>
        <Box
          as={motion.section}
          {...fadeInUp(0.02)}
          h="full"
          minH={0}
          borderRadius="28px"
          borderWidth="1px"
          borderColor="rgba(255,255,255,0.08)"
          bg="rgba(20,23,38,0.9)"
          backdropFilter="blur(8px)"
          boxShadow="0 0 0 1px rgba(255,138,61,0.08), 0 20px 60px rgba(0,0,0,0.6)"
          overflow="hidden"
        >
          <Flex
            h="full"
            minH={0}
            direction="column"
            overflow="hidden"
            borderRadius="28px"
          >
            {/* HEADER */}
            <Grid
              minH="44px"
              templateColumns="2.5rem 1fr 2.5rem"
              alignItems="center"
              borderBottomWidth="1px"
              borderBottomColor="rgba(255,255,255,0.06)"
              bg="rgba(16,21,37,0.9)"
              px={4}
            >
              <HStack spacing={2} aria-hidden="true">
                <Circle size="10px" bg="#ff8a3d" boxShadow="0 0 8px #ff8a3d" />
                <Circle size="10px" bg="#23d7c6" boxShadow="0 0 8px #23d7c6" />
                <Circle size="10px" bg="#ff6584" boxShadow="0 0 8px #ff6584" />
              </HStack>

              <Text
                textAlign="center"
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.08em"
                color="#ff8a3d"
              >
                BURN HORC
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
              gap={4}
              p={{ base: 4, sm: 5 }}
            >

              {/* TEXT AREA CONTAINER */}
              <Box
                position="relative"
                h="full"
                minH={{ base: "260px", sm: "320px" }}
                borderRadius="20px"
                bg="rgba(15,19,34,0.8)"
                border="1px solid rgba(255,255,255,0.06)"
                boxShadow="inset 0 0 0 1px rgba(255,255,255,0.02)"
              >

                {!isLoading ? (
                  <Textarea
                    value={input}
                    onChange={handleCookieInputChange}
                    placeholder="$ paste netscape blocks, json cookie data, or raw/header cookie strings"
                    spellCheck={false}
                    h="100%"
                    resize="none"
                    borderRadius="20px"
                    border="none"
                    bg="transparent"
                    px={5}
                    py={4}
                    fontSize="sm"
                    fontFamily="'JetBrains Mono', monospace"
                    color="#ffffff"
                    _placeholder={{ color: "rgba(255,255,255,0.4)" }}
                    _focusVisible={{
                      boxShadow: "0 0 0 1px rgba(255,138,61,0.5)",
                    }}
                  />
                ) : (
                  <Box
                    ref={checkLogRef}
                    role="log"
                    aria-live="polite"
                    h="100%"
                    overflow="auto"
                    px={5}
                    py={4}
                    fontSize="sm"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {checkLogs.length === 0 ? (
                      <Text color="rgba(255,255,255,0.6)">
                        Starting check...
                      </Text>
                    ) : (
                      checkLogs.map((entry) => (
                        <Text
                          key={entry.id}
                          mt={entry.id > 1 ? 2 : 0}
                          color={getLogToneColor(entry.tone)}
                          whiteSpace="pre-wrap"
                        >
                          {entry.text}
                        </Text>
                      ))
                    )}
                  </Box>
                )}
              </Box>

              {/* ACTION BUTTONS */}
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <Button
                  type="submit"
                  onClick={(event) => {
                    if (!isLoading) return;
                    event.preventDefault();
                    stopCheck();
                  }}
                  minH="3rem"
                  borderRadius="14px"
                  bg="linear-gradient(90deg, #ff8a3d, #ff6a00)"
                  color="#fff"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  boxShadow="0 8px 24px rgba(255,138,61,0.35)"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 30px rgba(255,138,61,0.45)",
                  }}
                  _active={{ transform: "scale(0.98)" }}
                >
                  {isLoading ? "Stop" : "Start"}
                </Button>

                <Button
                  type="button"
                  onClick={openUploadPicker}
                  isDisabled={isLoading}
                  minH="3rem"
                  borderRadius="14px"
                  bg="rgba(255,255,255,0.06)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="#fff"
                  fontWeight="600"
                  _hover={{
                    bg: "rgba(255,255,255,0.1)",
                  }}
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

    {/* MODAL PREMIUM STYLE */}
    <Modal
      isOpen={isSingleResultModalOpen}
      onClose={onCloseSingleCheckModal}
      isCentered
      size={{ base: "full", md: "2xl" }}
    >
      <ModalOverlay bg="rgba(0,0,0,0.7)" backdropFilter="blur(6px)" />

      <ModalContent
        bg="rgba(18,22,40,0.95)"
        border="1px solid rgba(255,255,255,0.1)"
        borderRadius={{ base: 0, md: "20px" }}
        boxShadow="0 20px 60px rgba(0,0,0,0.7)"
        color="#fff"
      >
        <ModalHeader
          borderBottom="1px solid rgba(255,255,255,0.06)"
          fontSize="sm"
          letterSpacing="0.1em"
          textTransform="uppercase"
          color="#ff8a3d"
        >
          Check Result
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody p={{ base: 4, sm: 6 }}>
          {modalResult ? (
            <Box>
              <Text fontSize="lg" fontWeight="600">
                {displayValue(modalResult?.plan)}
              </Text>
            </Box>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  </Box>
);
