package com.uptute.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.uptute.payloads.PageableRequest;
// import com.google.inject.Inject;
import com.uptute.services.TutorService;
import com.uptute.services.TutorServiceImpl;

@Path("/tutor")
@Produces({ MediaType.APPLICATION_JSON })
public class TutorResource {

    private TutorService service = new TutorServiceImpl();
    // @Inject
    // private TutorService service;

    @GET
    @Path("/{UUID}/shortInfo")
    public Response getShortInfo(@PathParam("UUID") String UUID) {
        return Response.status(200).entity(service.getShortInfo(UUID)).build();
    }

    @GET
    @Path("/{UUID}/fullInfo")
    public Response getFullInfo(@PathParam("UUID") String UUID) {
        return Response.status(200).entity(service.getFullInfo(UUID)).build();
    }

    @GET
    @Consumes(MediaType.APPLICATION_XML)
    @Path("/{UUID}/comments")
    public Response getComments(@PathParam("UUID") String UUID, PageableRequest request){
        return Response.status(200).entity(service.getComments(UUID, request)).build();
    }
}