package com.uptute.backend.account.servicies;

import org.springframework.stereotype.Service;

import com.uptute.backend.account.entities.User;
import com.uptute.backend.account.enums.ERole;
import com.uptute.backend.grpc.account.StudentDetails;

@Service
public class StudentDetailsServiceImpl extends DetailsServiceBase<StudentDetails> {

    @Override
    protected StudentDetails getDetails(User user) {
        return user.getStudentDetails();
    }

    @Override
    protected void setDetails(User user, StudentDetails details) {
        user.setStudentDetails(details);
    }

    @Override
    protected ERole getRole() {
        return ERole.ROLE_STUDENT;
    }
}