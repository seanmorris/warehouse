<?php
namespace SeanMorris\Warehouse;

$sessionHandler = new SessionHandler;

session_set_save_handler($sessionHandler, TRUE);
