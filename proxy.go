package main

import (
    "bytes"
    "encoding/json"
    "io"
    "net/http"
    "os"
)

func main() {
    apiKey := os.Getenv("VITE_DEEPSEEK_API_KEY")
    if apiKey == "" {
        panic("API key not found in environment")
    }

    http.HandleFunc("/api/chat", func(w http.ResponseWriter, r *http.Request) {
        // Handle CORS
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }

        // Read request body
        body, err := io.ReadAll(r.Body)
        if err != nil {
            http.Error(w, "Bad request", http.StatusBadRequest)
            return
        }

        // Forward to Taobao API
        req, err := http.NewRequest("POST", "https://tb.api.mkeai.com/v1/chat/completions", bytes.NewReader(body))
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        req.Header.Set("Content-Type", "application/json")
        req.Header.Set("Authorization", "Bearer "+apiKey)

        client := &http.Client{}
        resp, err := client.Do(req)
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadGateway)
            return
        }
        defer resp.Body.Close()

        // Copy response
        respBody, err := io.ReadAll(resp.Body)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(resp.StatusCode)
        w.Write(respBody)
    })

    println("Starting proxy server on :3001")
    println("Forwarding API requests to Taobao DeepSeek")
    http.ListenAndServe(":3001", nil)
}
