import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          backgroundColor="#444444"
          icon={<ViewIcon color="#AEBAC1" />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="500px" backgroundColor="#393939" color="#AEBAC1">
          <ModalHeader
            fontSize="40px"
            fontFamily="Poppins"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="250px"
              src={user.pic}
              alt={user.name}
            />
            <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Poppins">
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

// import React from 'react';
// import { ViewIcon } from '@chakra-ui/icons'
// import { IconButton } from '@chakra-ui/button'
// import { useDisclosure } from '@chakra-ui/hooks';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   Text,
//   Image,
// } from "@chakra-ui/react";

// const ProfileModal = ({ user, children }) => {
//     const { isOpen,onOpen,onClose } = useDisclosure();
//   return (
//     <>
//         {
//             children?
//             (
//                 <span onClick={onOpen}>{children}</span>
//             ) : (
//                 <IconButton
//                     display={{ base: "flex" }}
//                     icon={<ViewIcon />}
//                     onClick={onOpen}
//                 />
//             )
//         }
//         <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
//         <ModalOverlay />
//         <ModalContent h='400px'>
//           <ModalHeader
//             fontSize="40px"
//             fontFamily="Poppins"
//             display="flex"
//             justifyContent="center"
//           >
//             {user.name}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody
//             display="flex"
//             flexDir='column'
//             alignItems='center'
//             justifyContent='space-between'
//           >
//             <Image
//                 borderRadius="full"
//                 boxsize="150px"
//                 src={user.pic}
//                 alt={user.name}
//             />
//             <Text
//                 fontSize='30px'
//                 fontFamily="Poppins"
//                 display='flex'
//                 justifyContent='center'
//             >
//                 Email: {user.email}
//             </Text>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme='green' mr={3} onClick={onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }

// export default ProfileModal
