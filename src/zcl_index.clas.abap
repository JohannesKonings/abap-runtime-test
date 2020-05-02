CLASS zcl_index DEFINITION PUBLIC.

  PUBLIC SECTION.
  "!dummy
    METHODS run.
ENDCLASS.

CLASS zcl_index IMPLEMENTATION.

  METHOD run.
    DATA lo_writer TYPE REF TO zcl_writer.
    CREATE OBJECT lo_writer.
    lo_writer->write( ).
  ENDMETHOD.

ENDCLASS.