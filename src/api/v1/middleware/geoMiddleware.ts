// src/middleware/geoMiddleware.ts
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { db } from "../../../../config/firebaseConfig";

const getClientIp = (req: Request): string => {
  return (
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
    req.socket.remoteAddress ||
    ""
  );
};

const getCountryFromIP = async (ip: string): Promise<string | null> => {
  try {
    const url: string = `https://ipapi.co/${ip}/json/`;
    const { data }: { data: { country_name?: string } } = await axios.get(url);
    return data.country_name || null;
  } catch {
    return null;
  }
};

export const geoMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // const ip = "8.8.8.8"; Google DNS returning US, only for testing

    const ip: string = getClientIp(req);
    console.log("Raw IP:", ip);
  
    const country: string | null = await getCountryFromIP(ip);
    console.log("Country resolved:", country);
  
    if (country) {
      console.log("Writing to Firestore...");
      await db.collection("visitors").add({
        ip,
        country,
        endpoint: req.path,
        timestamp: new Date(),
      });
    } else {
      console.log("Country is null — not writing to Firestore");
    }
  
    (req as any).country = country;
    next();
  };
  
