import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [otherUser, setOtherUser] = useState(null);

  const queryClient = useQueryClient();

  // Fetch messages for this conversation
  const { isLoading: messagesLoading, error: messagesError, data: messages } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
        newRequest.get(`/messages/${id}`).then((res) => {
          return res.data;
        }),
  });

  // Fetch conversation details to get information about participants
  const { isLoading: convLoading, error: convError, data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () =>
        newRequest.get(`/conversations/single/${id}`).then((res) => {
          return res.data;
        }),
  });

  // Effect to fetch the other user's details when conversation data is available
  useEffect(() => {
    const fetchOtherUserData = async () => {
      if (!conversation) return;

      try {
        // Determine which user ID is the other person
        const otherUserId = conversation.sellerId === currentUser._id
            ? conversation.buyerId
            : conversation.sellerId;

        // Fetch the other user's details
        const res = await newRequest.get(`/users/${otherUserId}`);
        setOtherUser(res.data);
      } catch (err) {
        console.error("Error fetching other user data:", err);
      }
    };

    fetchOtherUserData();
  }, [conversation, currentUser._id]);

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  // Helper function to get the display name for the breadcrumbs
  const getDisplayName = () => {
    if (convLoading) return "Loading...";
    if (convError) return "User";
    if (!otherUser) return "...";

    // Return the username if available, otherwise return another user identifier
    return otherUser.username || "User";
  };

  return (
      <div className="message">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/messages" className="link">Messages</Link>
            <span className="separator">{" > "}</span>
            <span className="username">{getDisplayName()}</span>
          </div>
          {messagesLoading ? (
              "loading"
          ) : messagesError ? (
              "error"
          ) : (
              <div className="messages">
                {messages.map((m) => (
                    <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                      <img
                          src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                      />
                      <p>{m.desc}</p>
                    </div>
                ))}
              </div>
          )}
          <hr />
          <form className="write" onSubmit={handleSubmit}>
            <textarea type="text" placeholder="write a message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
  );
};

export default Message;