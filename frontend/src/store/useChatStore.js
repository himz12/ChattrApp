import {create} from "zustand"
import toast from "react-hot-toast"
import {axiosInstance} from "../lib/axios"
import { useAuthStore } from "./useAuthStore"
export const useChatStore = create((set, get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers: async () =>{
        set({isUsersLoading:true});
        try{
            const res = await axiosInstance.get("/message/users")
            set({users:res.data})
        } catch(error){
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading:false})
        }
    },

    getMessages : async(userId)=>{
        set({isMessagesLoading:true})
        try{
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
        } catch(error){
            toast.error(error.response.data.message)
        } finally {
            set({isMessagesLoading:false})
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const receiverId = selectedUser._id;
        try {
          const res = await axiosInstance.post(`/message/send/${receiverId}`, messageData); 
          set({ messages: [...messages, res.data] });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    
    subscribeToMessages: () => {
  const { selectedUser } = get();
  const socket = useAuthStore.getState().socket;

  // 🛡️ SAFETY CHECK: avoid crash if socket is null
  if (!selectedUser || !socket) return;

  socket.on("newMessage", (newMessage) => {
    const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
    if (!isMessageSentFromSelectedUser) return;

    set({
      messages: [...get().messages, newMessage],
    });
  });
},

unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  if (socket) {
    socket.off("newMessage");
  }
},


    setSelectedUser:(user) => set({ selectedUser: user })

}))