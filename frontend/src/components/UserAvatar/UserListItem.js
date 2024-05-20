import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
// import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ user, handleFunction }) => {
  // const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#2E6541"
      _hover={{
        background: "#38A169",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="#AEBAC1"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;

// import { Avatar } from "@chakra-ui/avatar";
// import { Box, Text } from "@chakra-ui/layout";
// import { ChatState } from "../../Context/ChatProvider";

// const UserListItem = ({ handleFunction }) => {

//   const { user } = ChatState();

//   return (
//     <Box
//       onClick={handleFunction}
//       cursor="pointer"
//       _hover={{
//         background: "#38B2AC",
//         color: "white",
//       }}
//       w="100%"
//       display="flex"
//       alignItems="center"
//       backgroundColor="#2E6541" 
//       color="#AEBAC1"
//       px={3}
//       py={2}
//       mb={2}
//       borderRadius="lg"
//     >
//       <Avatar
//         mr={2}
//         size="sm"
//         cursor="pointer"
//         name={user.name}
//         src={user.pic}
//       />
//       <Box>
//         <Text>{user.name}</Text>
//         <Text fontSize="xs">
//           <b>Email : </b>
//           {user.email}
//         </Text>
//       </Box>
//     </Box>
//   );
// };

// export default UserListItem;