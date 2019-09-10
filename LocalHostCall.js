import React from "react";
import axios from "axios";

export default async LocalHostCall => {
  const url = "http://localhost:4454/servers";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("error");
  }
};
