import Link from "next/link";
import React from "react";
import { BsArrowsMove } from "react-icons/bs";
import { FaBath, FaBed, FaCarAlt } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import styles from "../../styles/properties.module.css";

const Property = () => {
  return (
    <Link href="/property/123">
      <a>
        <div className={styles.property}>
          <div
            style={{
              backgroundImage: "url(/image-2.jpg)"
            }}
            className={styles.bg_image}
          ></div>
          <div>
            <p className={styles.fs_tr}>for sale</p>
            <p>
              starting from: <span>Ksh 3,000,000</span>
            </p>
            <div className={styles.location}>
              <ImLocation />
              <p>25th avenue, Ongata Rongai, Nairobi</p>
            </div>
            <div className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              unde repudiandae enim. Blanditiis voluptate beatae nulla. Quis
              ipsa molestias quaerat libero, at quasi ipsam nesciunt nisi eum
              odio tempore eveniet! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatibus labore aspernatur similique rem
              enim a praesentium debitis necessitatibus, voluptatum, aliquid
              eveniet perferendis officia aliquam tempore! Esse recusandae
              facere corrupti tempore impedit necessitatibus earum, culpa
              commodi quisquam, enim reprehenderit possimus, repudiandae vel
              accusamus. Sequi officiis minima, ratione eligendi mollitia
              molestias esse accusamus delectus illum quaerat quae perferendis
              ullam soluta eum modi. Similique quibusdam deleniti dignissimos
              nesciunt ipsa est voluptate hic, praesentium, commodi quia
              reprehenderit. Facere fuga reprehenderit, necessitatibus molestias
              tempora dolor alias voluptatibus, officiis dignissimos iure
              voluptates recusandae, harum similique perferendis ipsa tempore!
              Officiis sed et dolor expedita! Aliquid esse quisquam nobis
              officiis in repellendus quibusdam nihil asperiores non, minus
              magni dicta quia? Fuga vero nostrum vitae totam assumenda placeat
              voluptate eius qui? Tenetur cum hic ut animi soluta neque esse,
              necessitatibus molestias provident error magnam laudantium. Nihil,
              magni aspernatur. Odit sapiente reprehenderit voluptatum explicabo
              inventore necessitatibus eligendi repellat neque veniam eveniet.
              Tempora accusamus deserunt totam nostrum! Laudantium temporibus,
              sit placeat autem voluptas blanditiis unde itaque velit deserunt
              sunt provident ipsam vel adipisci libero nisi quos non quam
              perspiciatis a, quo praesentium est aperiam nemo ullam! Pariatur
              molestias vel unde voluptas. Nemo aliquid delectus quas culpa,
              consectetur nam dolorum necessitatibus earum.
            </div>
            <div className={styles.p_footer}>
              <div>
                <BsArrowsMove size="2.5rem" />
                <p>780 sqft</p>
              </div>
              <div>
                <FaBed size="2.5rem" />
                <p>4 Bed Room</p>
              </div>
              <div>
                <FaBath size="2.5rem" />
                <p>3 Baths Bed</p>
              </div>
              <div>
                <FaCarAlt size="2.5rem" />
                <p>2 Garages</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Property;
