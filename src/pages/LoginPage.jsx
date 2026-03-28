import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';

const BACKEND_URL = 'http://localhost:8080/api/auth';