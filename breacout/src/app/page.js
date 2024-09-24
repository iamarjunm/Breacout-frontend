"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Alert, Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { gsap } from 'gsap';
import Image from 'next/image';

const Home = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const router = useRouter();
  
  const imageRefs = useRef([]);
  const containerRef = useRef(null);

  const images = [
    "https://images.unsplash.com/photo-1609975622917-0b2da2acead8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1726597764489-5ba1c00a178a?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1666539896355-636d3a1cc497?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1631463023839-5c5aacf65eba?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return setErrorMessage("Please fill all the details.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        // Simulate server response for image selection (replace with actual logic)
        const selectedImageIndex = Math.floor(Math.random() * images.length);
        expandImage(selectedImageIndex);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const expandImage = (index) => {
    setExpandedImage(index);
    
    gsap.to(imageRefs.current[index], {
      duration: 1,
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 50,
      ease: 'power2.inOut',
      onComplete: () => {
        // Navigate to next page after animation
        router.push("/gryffindor");
      }
    });

    gsap.to(containerRef.current, {
      duration: 1,
      opacity: 0,
      ease: 'power2.inOut'
    });
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="h-screen w-full relative" ref={containerRef}>
      <div className="h-screen grid grid-cols-4">
        {images.map((src, index) => (
          <div key={index} className="h-full object-contain">
            <img
              ref={el => imageRefs.current[index] = el}
              className="h-full w-screen"
              src={src}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center backdrop-blur-sm">
        <div>
          <h1 className="font-bold text-center">
            <span className="text-2xl">WELCOME TO</span>
            <br />
            <span className="text-5xl custom-font">BREACOUT</span>
          </h1>
        </div>
        <div>
          <form
            className="flex flex-col gap-4 text-center px-24 py-12"
            onSubmit={handleSubmit}
          >
            <div className="w-22">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-4 rounded-lg h-10"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="w-22">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 rounded-lg h-10"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="">
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </div>
              ) : (
                <span className="font-bold text-xl border-2 px-6 py-2 rounded-2xl backdrop-blur-lg bg-white/30 border-white">
                  <FaArrowRight />
                </span>
              )}
            </Button>
          </form>
          {errorMessage && (
            <Alert
              className="mt-5 flex justify-center text-red-600 items-center w-full"
              color="failure"
            >
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;