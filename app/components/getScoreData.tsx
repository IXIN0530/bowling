"use client"
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import { scoreDataTypes } from "../types";
import apiClient from "../backend/apiClient";
type Type = {
  id1: number;
  id2: number;
  id3: number;
  password: string;
  setScoreData: (data: scoreDataTypes[]) => void;
  // scoreData: scoreDataTypes[];
}

const GetScoreData = ({ id1,
  id2,
  id3,
  password,
  setScoreData, }: Type) => {
  const [item, setItem] = useState<scoreDataTypes[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<scoreDataTypes[]>(`/login/${id1}/${id2}/${id3}/${password}`)
        setItem(response.data)
        setScoreData(response.data)
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchData()
  }, [id1])

  if (error) {
    return <p>{error}</p>
  }

  if (!item) {
    return <p className="text-center my-4">loading...</p>
  }

  return (
    <div></div>
  )
}

export default GetScoreData;