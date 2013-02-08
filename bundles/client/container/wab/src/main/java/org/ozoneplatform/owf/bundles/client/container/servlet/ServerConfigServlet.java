package org.ozoneplatform.owf.bundles.client.container.servlet;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.*;

public class ServerConfigServlet extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("serverConfig.jsp");
    }
}