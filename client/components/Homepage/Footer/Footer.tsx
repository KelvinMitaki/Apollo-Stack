import React from "react";
import styles from "../../../styles/Footer.module.css";
import { TiLocationArrow } from "react-icons/ti";
import { RiArrowDropRightFill } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BsFillClockFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>
        <h4>yellow market</h4>
        <p>Subscribe our newsletter gor get notification about new updates.</p>
        <div>
          <input type="text" />
          <TiLocationArrow />
        </div>
      </div>
      <div>
        <h3>property city</h3>
        <div>
          <div>
            <RiArrowDropRightFill />
            <p>runda</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Nairobi</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Mombasa</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kajiado</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Ruiru</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kiambu</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kikuyu</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Ngong</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Athi River</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kilifi</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Thika</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Nakuru</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kiserian</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Malindi</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Limuru</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Naivasha</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Juja</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Isinya</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kangundo</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Nanyuki</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Machakos</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Narok</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kisumu</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Watamu</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Nyandarua</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kitengela</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kwale</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kinoo</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Eldoret</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Matuu</p>
          </div>
          <div>
            <RiArrowDropRightFill />
            <p>Kamulu</p>
          </div>
        </div>
      </div>
      <div>
        <h3>Contact Us</h3>
        <div>
          <div>
            <ImLocation />
            <p>25th Avenue. Ongata Rongai, KE</p>
          </div>
          <div>
            <IoMdCall />
            <p>(+254) 712 345 678</p>
          </div>
          <div>
            <MdEmail />
            <p>test@gmail.com</p>
          </div>
          <div>
            <BsFillClockFill />
            <p>Sun - Fri, 08 AM - 06 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
