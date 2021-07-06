import { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";

import Notificacion from "../ui/notification";

async function sendData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "applicacion/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

function ContactForm() {
  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setError] = useState();

  useEffect(()=>{
    if(requestStatus === 'success'||requestStatus === 'error'){
      const timer =setTimeout(()=>{
        setRequestStatus(null)
        setError(null)
      },3000)

      return ()=>clearTimeout(timer)
    }
  },[requestStatus])


  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");
    try {
      await sendData({
        email: emailRef.current.value,
        name: nameRef.current.value,
        message: messageRef.current.value,
      });

      setRequestStatus("success");
    } catch (error) {
      setError(error.message);
      setRequestStatus("error");
    }
  }

  let notificacion;
  if (requestStatus === "pending") {
    notificacion = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }
  if (requestStatus === "success") {
    notificacion = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }
  if (requestStatus === "error") {
    notificacion = {
      status: "error",
      title: "Error...",
      message: requestError,
    };
  }
  return (
    <section className={classes.contact}>
      <h1>How I can help you</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input ref={emailRef} type="text" id="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input ref={nameRef} type="text" id="name" required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea ref={messageRef} id="text" rows="5" />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notificacion&&<Notificacion status={notificacion.status} title={notificacion.title} message={notificacion.message}></Notificacion>}
    </section>
  );
}

export default ContactForm;
