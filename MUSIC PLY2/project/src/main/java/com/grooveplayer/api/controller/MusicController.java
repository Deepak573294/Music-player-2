package com.grooveplayer.api.controller;

import com.grooveplayer.api.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/music")
public class MusicController {
    
    @Autowired
    private MusicService musicService;
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadMusic(
        @RequestParam("file") MultipartFile file,
        @RequestParam("userId") Long userId
    ) {
        return musicService.saveMusic(file, userId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.badRequest().build());
    }
    
    @GetMapping("/playlist/{userId}")
    public ResponseEntity<?> getPlaylist(@PathVariable Long userId) {
        return ResponseEntity.ok(musicService.getUserPlaylist(userId));
    }
}