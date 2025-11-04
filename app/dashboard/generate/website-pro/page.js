'use client'
import React from 'react'
import * as cheerio from 'cheerio'
import axios from 'axios'

const WebsiteProPersonalization = () => {
    
    const scrapeWebsite = async (domain) => {
  const res = await fetch("/api/personalize/website-pro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domain: domain })
  });
  const data = await res.json();
  console.log(data.pageText)
};


  return (
    <>
    <button onClick={()=> scrapeWebsite("https://slack.com/")}>
    Web Scrapping
    </button>
    </>
  )
}

export default WebsiteProPersonalization