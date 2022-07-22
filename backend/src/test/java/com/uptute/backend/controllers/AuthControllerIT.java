// package com.uptute.backend.controllers;

// import com.uptute.backend.services.auth.AuthService;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.test.context.ContextConfiguration;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.MvcResult;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

// @AutoConfigureMockMvc
// @ContextConfiguration(classes = {AuthController.class, AuthService.class})
// @WebMvcTest
// public class AuthControllerIT {
 
//     @Autowired
//     private MockMvc mockMvc;

//     @Test
//     public void testAuthenticateSuccess() {
//         // String ssoProvider = "google";
//         // MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(String.format("/auth/%s/signin", ssoProvider))
//         //         .with(user(TEST_USER_ID))
//         //         .with(csrf())
//         //         .content(birthday)
//         //         .contentType(MediaType.APPLICATION_JSON)
//         //         .accept(MediaType.APPLICATION_JSON))
//         //         .andExpect(status().isOk())
//         //         .andReturn();
//     }

//     @Test
//     public void testAuthenticateFailWrongProvider() {

//     }
// }
