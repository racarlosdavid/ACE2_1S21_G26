package com.example.apppve_g26.internet;

import java.util.List;

public class Respuesta {

    private String respuesta;
    private Object usuario;

    public String verificar() {
        if (respuesta.equals("false")){
            return "Datos incorrectos, intenta otra vez :c";
        }else {
            return "Datos correctos c:";
        }
    }

    public String get(String parametro){
        String data=usuario.toString();
        data=data.replace("}","");
        data=data.replace("{","");
        data=data.replace(" ","");
        String[] elementos = data.split(",");
        for (String i: elementos){
            String[] tmp = i.split("=");
            for(int x=0; x<tmp.length ; x++ ){
                if ((tmp[0]).equals(parametro)) {
                    if (parametro.equals("iduser")) {
                        Double numero=Double.parseDouble(tmp[1]);
                        int t= numero.intValue();
                        return String.valueOf(t);
                    }
                    return tmp[1];
                }
            }

        }
    return "error";
    }

}
