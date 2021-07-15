package com.uptute.payloads;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.QueryParam;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class PageableQueryParams {
    @DefaultValue("1")
    @QueryParam("page")
    private int page;
    @DefaultValue("2")
    @QueryParam("itemsPerPage")
    private int itemsPerPage;
}
