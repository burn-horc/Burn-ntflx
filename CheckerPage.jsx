import React, { useState, useEffect } from "react";
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
import { supabase } from "./supabaseClient";

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

export default function CheckerPage(props) {
  const {
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
    bulkValidResults
  } = props;

  
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
const [cookies, setCookies] = useState([]);
  
  
  useEffect(() => {
  if (bulkValidResults && bulkValidResults.length > 0) {
    setIsBulkModalOpen(true);
  }
}, [bulkValidResults]);
  const toast = useToast();
  const prefersReducedMotion = usePrefersReducedMotion();
  const showUploadedFileMarker = Boolean(uploadedInputBanner);
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
      duration: 4000,
    });
  };
  const handlePcCopy = async (link) => {
  const copied = await copyTextToClipboard(link);
  if (!copied) return;

  const toastId = "checker-single-pc-link-copied";
  showAppToast(toast, {
    id: toastId,
    title: "PC link copied",
    status: "success",
    duration: 4000,
  });
};

const loadSavedCookies = async () => {
  const { data, error } = await supabase
    .from("cookies")
    .select("cookie");

  if (error) {
    console.error("Error:", error);
    return;
  }

  if (!data || data.length === 0) {
    alert("No cookies found in database");
    return;
  }

  // Initialize shuffle bag if not exists or empty
  if (!loadSavedCookies.shuffleBag || loadSavedCookies.shuffleBag.length === 0) {
    const cookieList = data.map(item => item.cookie);

    // Fisher-Yates shuffle
    for (let i = cookieList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cookieList[i], cookieList[j]] = [cookieList[j], cookieList[i]];
    }

    loadSavedCookies.shuffleBag = cookieList;
  }

  // Take first cookie from shuffled list
  const cookieToShow = loadSavedCookies.shuffleBag.shift();

  // Update textarea using your existing handler
  handleCookieInputChange({
    target: {
      value: cookieToShow
    }
  });
};
 
  return (
    <Box
      as="main"
      h="100dvh"
      minH="100dvh"
      overflowX="hidden"
      overflowY="auto"
      bg="#0d0f18"
      color="#ffffff"
    >
      <Box
        mx="auto"
        h="100%"
        w="full"
        px={{ base: 2, sm: 3, lg: 4 }}
        py={{ base: 2, sm: 3 }}
      >
        <Grid h="full" minH={0} templateRows="minmax(0,1fr) auto" gap={3}>
          <Box
            as={motion.section}
            {...fadeInUp(0.02)}
            h="full"
            minH={0}
            borderRadius="24px"
            borderWidth="1px"
            borderColor="rgba(255,255,255,0.06)"
            bg="#141726"
            boxShadow="0 10px 30px rgba(0,0,0,0.5)"
            overflow="hidden"
          >
            <Flex
              h="full"
              minH={0}
              direction="column"
              overflow="hidden"
              borderRadius="24px"
              borderWidth="0"
              bg="#141726"
            >
              <Grid
                minH="40px"
                templateColumns="2.5rem 1fr 2.5rem"
                alignItems="center"
                borderBottomWidth="1px"
                borderBottomColor="rgba(255,255,255,0.06)"
                bg="#101525"
                px={3}
              >
                <HStack spacing={1.5} aria-hidden="true">
                  <Circle size="10px" bg="#ff8a3d" />
                  <Circle size="10px" bg="#23d7c6" />
                  <Circle size="10px" bg="#ff6584" />
                </HStack>
                <Text
  m={0}
  noOfLines={1}
  textAlign="center"
  fontSize="xs"
  fontWeight="700"
  fontFamily="'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Menlo, Consolas, monospace"
  letterSpacing="0.08em"
  bgGradient="linear(to-r, #ffb347, #ff8a3d, #ffb347)"
  bgClip="text"
  textShadow="0 0 6px rgba(255,138,61,0.6), 0 0 12px rgba(255,179,71,0.4)"
>
  BURN HORC
</Text>
                <Box aria-hidden="true" />
              </Grid>

              <Box
                as="form"
                onSubmit={runCheck}
                display="grid"
                flex="1"
                minH={0}
                gridTemplateRows="minmax(0,1fr) auto auto auto"
                gap={3}
                p={{ base: 3, sm: 4 }}
              >
                <Box
                  position="relative"
                  h="full"
                  minH={{ base: "260px", sm: "320px" }}
                  borderRadius="16px"
                  bg="#141726"
                >
                  {showUploadedFileMarker ? (
                    <HStack
                      position="absolute"
                      top={3}
                      left={4}
                      zIndex={2}
                      spacing={2}
                      align="center"
                      pointerEvents="none"
                      aria-hidden="true"
                    >
                      <Box w="2px" h="0.95rem" borderRadius="full" bg="#ff8a3d" />
                      <Text
                        m={0}
                        fontSize="0.68rem"
                        fontWeight="700"
                        fontFamily="'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Menlo, Consolas, monospace"
                        letterSpacing="0.06em"
                        color="#ff8a3d"
                      >
                        B-U-R-N
                      </Text>
                      <Text
                        m={0}
                        fontSize="0.66rem"
                        fontWeight="600"
                        fontFamily="'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Menlo, Consolas, monospace"
                        letterSpacing="0.05em"
                        color="rgba(255,255,255,0.6)"
                      >
                        cookies.input
                      </Text>
                    </HStack>
                  ) : null}

                  {!isLoading ? (
                    <Textarea
                      value={input}
                      onChange={handleCookieInputChange}
                      placeholder="$ paste netscape blocks, json cookie data, or raw/header cookie strings"
                      spellCheck={false}
                      h="100%"
                      minH="100%"
                      w="100%"
                      resize="none"
                      borderRadius="16px"
                      borderWidth="1px"
                      borderColor="rgba(255,255,255,0.1)"
                      bg="#0f1322"
                      px={4}
                      py={3}
                      pt={showUploadedFileMarker ? 9 : 3}
                      fontSize="sm"
                      fontFamily="'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Menlo, Consolas, monospace"
                      color="#ffffff"
                      _placeholder={{ color: "rgba(255,255,255,0.45)" }}
                      _hover={{
                        borderColor: "rgba(255,138,61,0.58)",
                        bg: "#101525",
                      }}
                      _focusVisible={{
                        borderColor: "rgba(255,138,61,0.78)",
                        boxShadow: "0 0 0 1px rgba(255,138,61,0.44)",
                        bg: "#101525",
                      }}
                    />
                  ) : (
                    <Box
                      ref={checkLogRef}
                      role="log"
                      aria-live="polite"
                      h="100%"
                      minH="100%"
                      overflow="auto"
                      borderRadius="16px"
                      borderWidth="1px"
                      borderColor="rgba(255,255,255,0.1)"
                      bg="#0f1322"
                      px={4}
                      py={3}
                      pt={showUploadedFileMarker ? 9 : 3}
                      fontSize="sm"
                      fontFamily="'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Menlo, Consolas, monospace"
                    >
                      {checkLogs.length === 0 ? (
                        <Box m={0} pl={3} borderLeftWidth="2px" borderLeftColor="rgba(255,255,255,0.72)">
                          <Text m={0} color="rgba(255,255,255,0.8)">
                            Starting check...
                          </Text>
                        </Box>
                      ) : (
                        checkLogs.map((entry) => (
                          <Box
                            key={entry.id}
                            m={0}
                            mt={entry.id > 1 ? 1 : 0}
                            pl={3}
                            borderLeftWidth="2px"
                            borderLeftColor={getLogToneColor(entry.tone)}
                          >
                            <Text
                              m={0}
                              whiteSpace="pre-wrap"
                              wordBreak="break-word"
                              color={getLogToneColor(entry.tone)}
                            >
                              {entry.text}
                            </Text>
                          </Box>
                        ))
                      )}
                    </Box>
                  )}
                </Box>

                <Flex align="center" gap={3} justify="space-between">
                  <Box
                    borderWidth="1px"
                    borderColor="rgba(255,255,255,0.1)"
                    borderRadius="10px"
                    bg="#101525"
                    px={2.5}
                    py={1.5}
                    flexShrink={0}
                  >
                    <HStack spacing={2}>
                      <Text
                        fontSize="0.68rem"
                        fontWeight="700"
                        letterSpacing="0.09em"
                        textTransform="uppercase"
                        color="rgba(255,255,255,0.64)"
                      >
                        NFTOKEN
                      </Text>
                      <Switch
                        isChecked={checkNFToken}
                        onChange={toggleCheckNFToken}
                        isDisabled={isLoading}
                        colorScheme="purple"
                        size="sm"
                      />
                    </HStack>
                  </Box>

                  <HStack spacing={2} ml="auto" flexShrink={0}>
                    <Text
                      fontSize="0.68rem"
                      fontWeight="700"
                      letterSpacing="0.09em"
                      textTransform="uppercase"
                      color="rgba(255,255,255,0.64)"
                    >
                      Workers
                    </Text>
                    <HStack
                      spacing={1.5}
                      opacity={1}
                      pointerEvents="auto"
                    >
                      <Button
                        type="button"
                        onClick={decrementWorkerCount}
                        isDisabled={isLoading || workerCount <= minWorkerCount}
                        aria-label="Decrease worker count"
                        h="28px"
                        minW="28px"
                        p={0}
                        borderRadius="full"
                        borderWidth="1px"
                        borderColor="rgba(255,255,255,0.14)"
                        bg="#101525"
                        color="#ffffff"
                        fontSize="base"
                        lineHeight="none"
                        transition="transform 0.16s ease, background-color 0.16s ease"
                        _hover={{ bg: "rgba(255,255,255,0.08)", ...hoverLift }}
                        _active={{ transform: "translateY(0)" }}
                        _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
                      >
                        &lt;
                      </Button>
                      <Text
                        minW="24px"
                        textAlign="center"
                        fontSize="sm"
                        fontWeight="600"
                        color="white"
                      >
                        {workerCount}
                      </Text>
                      <Button
                        type="button"
                        onClick={incrementWorkerCount}
                        isDisabled={isLoading || workerCount >= maxWorkerCount}
                        aria-label="Increase worker count"
                        h="28px"
                        minW="28px"
                        p={0}
                        borderRadius="full"
                        borderWidth="1px"
                        borderColor="rgba(255,255,255,0.14)"
                        bg="#101525"
                        color="#ffffff"
                        fontSize="base"
                        lineHeight="none"
                        transition="transform 0.16s ease, background-color 0.16s ease"
                        _hover={{ bg: "rgba(255,255,255,0.08)", ...hoverLift }}
                        _active={{ transform: "translateY(0)" }}
                        _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
                      >
                        &gt;
                      </Button>
                    </HStack>
                  </HStack>
                </Flex>

                <VStack align="stretch" spacing={2}>
                  <Box
                    position="relative"
                    h="8px"
                    overflow="hidden"
                    borderRadius="full"
                    borderWidth="1px"
                    borderColor="rgba(255,255,255,0.1)"
                    bg="#101525"
                  >
                    <Box
                      position="absolute"
                      insetY={0}
                      left={0}
                      borderRadius="full"
                      bg="#ff8a3d"
                      w={isProgressIndeterminate ? "28%" : progressBarStyle?.width || "0%"}
                      animation={
                        isProgressIndeterminate
                          ? "terminal-progress-indeterminate 1.1s ease-in-out infinite"
                          : "none"
                      }
                      style={isProgressIndeterminate ? undefined : progressBarStyle}
                    />
                  </Box>
                  <Box
                    h="1px"
                    w="full"
                    bg="rgba(255,255,255,0.08)"
                    aria-hidden="true"
                  />
                </VStack>

                <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={2}>
                  <Input
                    ref={uploadInputRef}
                    type="file"
                    accept={filePickerAccept}
                    display="none"
                    onChange={(event) => void handleUploadFile(event)}
                  />

                  <Button
                    type="submit"
                    onClick={(event) => {
                      if (!isLoading) return;
                      event.preventDefault();
                      stopCheck();
                    }}
                    minH="2.8rem"
                    borderRadius="12px"
                    borderWidth="1px"
                    borderColor="rgba(255,138,61,0.78)"
                    bg="#ff8a3d"
                    color="#ffffff"
                    fontSize="sm"
                    fontWeight="700"
                    letterSpacing="0.07em"
                    textTransform="uppercase"
                    transition="transform 0.16s ease, background-color 0.16s ease"
                    _hover={{ bg: "#e8782d", ...hoverLift }}
                    _active={{ transform: "translateY(0)" }}
                  >
                    {isLoading ? "Stop" : "Start"}
                  </Button>

            
 

                  <Button
                    type="button"
                    onClick={openUploadPicker}
                    disabled={isLoading}
                    minH="2.8rem"
                    borderRadius="12px"
                    borderWidth="1px"
                    borderColor="rgba(255,255,255,0.12)"
                    bg="#101525"
                    color="#ffffff"
                    fontSize="sm"
                    fontWeight="700"
                    letterSpacing="0.07em"
                    textTransform="uppercase"
                    transition="transform 0.16s ease, background-color 0.16s ease"
                    _hover={{ bg: "rgba(255,255,255,0.08)", ...hoverLift }}
                    _active={{ transform: "translateY(0)" }}
                    _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                  >
                    Upload File
                  </Button>

       <Button onClick={loadSavedCookies}>
  Load Saved Cookies
</Button>
                  
                </Grid>
              </Box>
            </Flex>
          </Box>

          <AppCredits />
        </Grid>
      </Box>

      

      
      

      <Modal
  isOpen={isBulkModalOpen}
  onClose={() => setIsBulkModalOpen(false)}
  isCentered
  size={{ base: "full", md: "3xl" }}
>
  <ModalOverlay bg="rgba(0,0,0,0.62)" backdropFilter="blur(2px)" />

  <ModalContent
    bg="#141726"
    borderWidth="1px"
    borderColor="rgba(255,255,255,0.08)"
    color="#ffffff"
    mx={{ base: 0, md: 3 }}
    borderRadius={{ base: 0, md: "16px" }}
  >
    <ModalHeader
      borderBottomWidth="1px"
      borderBottomColor="rgba(255,255,255,0.08)"
      fontSize="sm"
      letterSpacing="0.08em"
      textTransform="uppercase"
      color="#ff8a3d"
    >
      Valid Accounts ({bulkValidResults?.length || 0})
    </ModalHeader>

    <ModalCloseButton />

    <ModalBody p={{ base: 3, sm: 4 }} maxH="70vh" overflowY="auto">
  {bulkValidResults?.map((result, index) => {
    const modalDetailItems = [
      ["Plan", result?.plan],
      ["Country", result?.countryOfSignup],
      ["Price", result?.price],
      ["Membership", result?.membershipStatus],
      ["Member Since", result?.memberSince],
      ["Next Billing", result?.nextBilling],
      ["Email", result?.email],
      ["Email Verified", displayBoolean(result?.emailVerified)],
      ["Phone", result?.phone],
      ["Phone Verified", displayBoolean(result?.phoneVerified)],
    ];

    return (
      <Box
        key={index}
        mb={4}
        borderRadius="12px"
        borderWidth="1px"
        borderColor="rgba(35,215,198,0.4)"
        bg="#101525"
        p={3}
      >
        <Text fontWeight="600" color="#23d7c6">
          {displayValue(result.plan)}
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2} mt={2}>
          {modalDetailItems.map(([label, value], i) =>
            value ? (
              <Text key={i} fontSize="sm">
                <b>{label}:</b> {displayValue(value)}
              </Text>
            ) : null
          )}
        </SimpleGrid>

        <HStack mt={4} spacing={3}>
          <Button
            flex={1}
            bg="#ff8c42"
            color="white"
            onClick={() =>
              handleAndroidCopy(readResultTokenLink(result))
            }
          >
            Android
          </Button>

          <Button
            flex={1}
            bg="#ff8c42"
            color="white"
            onClick={() =>
              handlePcCopy(readResultTokenLink(result))
            }
          >
            PC
          </Button>


          <Button
  onClick={() => {
    console.log(result);
    navigator.clipboard.writeText(result.originalCookie || "NO COOKIE FOUND");
  }}
>
  COPY COOKIE
</Button>
        
        </HStack>
      </Box>
    );
  })}
</ModalBody>
</ModalContent>
</Modal>

</Box>

);
}
