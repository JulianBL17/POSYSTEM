package com.pos.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.pos.model.Usuario;
import com.pos.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    private final UsuarioRepository repo;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    // LISTAR USUARIOS
    @GetMapping
    public List<Usuario> listar() {
        return repo.findAll();
    }

    // CREAR USUARIO
    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return repo.save(usuario);
    }

    // ACTUALIZAR USUARIO
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable int id, @RequestBody Usuario usuario) {
        return repo.findById(id)
            .map(usuarioExistente -> {
                usuarioExistente.setNombre(usuario.getNombre());
                usuarioExistente.setRol(usuario.getRol());
                usuarioExistente.setCorreo(usuario.getCorreo());
                
                if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
                    usuarioExistente.setPassword(passwordEncoder.encode(usuario.getPassword()));
                }

                Usuario actualizado = repo.save(usuarioExistente);
                return ResponseEntity.ok(actualizado);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // ELIMINAR USUARIO
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}