import React, { useState } from "react";
import NavBar from "./NavBar";
import "../css/About.css";

function About() {
  return (
    <div id="About">
      <NavBar></NavBar>
      <div className="main-header">About</div>
      <div className="sec">
        <div className="sub-header">What is Lasco?</div>
        <div className="paragraph">
          Lasco is a social digital art platform, in every meaning of the
          phrase. We make it easy for talented artists to interact with fans,
          collaborate with fellow artists, and sell their digital art with NFTs.
          We are excited to see how creative artists explore new mediums and
          hope that through our platform, artists can explore this new world of
          NFTs together!
        </div>
      </div>
      <div className="sec">
        <div className="sub-header">What are NFTs?</div>
        <div className="paragraph">
          NFTs are non-fungible tokens. But basically, that’s jargon-- what they
          really are are a way to own digital items. They open up a world full
          of possibilities into online communities that will only become more
          and more relevant as the digital world permeates are lives. One of
          these is digital art-- which in the past, was prviy to copyright
          violations and lack of monetization, making it difficult for digital
          artists to make a living off their work, even when it inspires and
          motivates millions.
        </div>
      </div>
      <div className="sec">
        <div className="sub-header">But can't I just copy and paste?</div>
        <div className="paragraph">
          Since the full resolution file is only available to those who own the
          artwork, a regular user on Lasco cannot copy the full resolution file.
          Even with this, yes, someone who owns the artwork could make a copy of
          it and share that online. This doesn’t, however, take away from the
          appeal of NFTs. Art is not just about the piece itself but also the
          artist behind it, and the only piece that has a real artist behind it
          is the authentic one. This is also why just like physical art, only
          the original NFT has resale value.
        </div>
      </div>
      <div className="sec">
        <div className="sub-header">Curious about our name?</div>
        <div className="paragraph">
          Lasco is a shortened version of ‘Lascaux’ cave in France--one of the
          first caves with handpaintings. It was discovered by Marcel Ravidat
          and his dog Robot in 1940. Recognizing the importance of this cave,
          Ravidat and his friends guarded it for over a year until its
          monitoring was taken over by the French government. There is an urban
          legend that when Picasso, visited this cave, he announced that “We
          have invented nothing”. This name serves as a reminder that art has
          existed since the dawn of humanity-- and NFTs are only the next
          evolution of it. It is exciting to witness how art will evolve within
          the coming years. Who will be the next Van Gogh?
        </div>
      </div>
    </div>
  );
}

export default About;
