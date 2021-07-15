package com.uptute.resources;

import javax.ws.rs.BeanParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.uptute.payloads.PageableQueryParams;
// import com.google.inject.Inject;
import com.uptute.services.TutorService;
import com.uptute.services.TutorServiceImpl;

@Path("/tutor")
public class TutorResource {

    private TutorService service = new TutorServiceImpl();
    // @Inject
    // private TutorService service;

    @GET
    @Path("/{UUID}/info")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getShortInfo(@PathParam("UUID") String UUID) {
        return Response.status(200).entity(service.getInfo(UUID)).build();
    }

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    @Path("/{UUID}/comments")
    public Response getComments(@PathParam("UUID") String UUID, @BeanParam PageableQueryParams pageable) {
        return Response.status(200).entity(service.getComments(UUID, pageable)).build();
    }
}