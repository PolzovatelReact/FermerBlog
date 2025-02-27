import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSelector } from "react-redux";
import { fetchPosts } from "../../../store/posts/postsSlice";
import DOMPurify from "dompurify";
import styles from "./style.module.css";
import LeftMenu from "./LeftMenu";
import "./../../../index.css"; // здесь переключатель темы
import { RootState } from "../../../store";

const categoryNames: { [key: string]: string } = {
  sauce: "Соусы",
  main: "Мясо",
  dessert: "Десерты",
  article: "Обучение",
  paython: "Питон",
};

const BlogList: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme); //переключение темы
  const dispatch = useAppDispatch();

  const { data, isLoading, hasError } = useAppSelector((state) => state.posts);
  const { category } = useParams<{ category?: string }>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error loading posts.</div>;

  // Категории из данных
  const uniqueCategories = Array.from(
    new Set(data.map((post: { type: any }) => post.type))
  );

  // Фильтр категорий
  const filteredPosts = category
    ? data.filter((post: { type: string }) => post.type === category)
    : data;

  return (
    <div>
      <div id="blog_header">
        <h1 className={styles.blog_header_text}>Блог2</h1>
      </div>
      <div className={styles.content_main}>
        <div id={`${styles.blog_left}`}>
          <LeftMenu
            uniqueCategories={uniqueCategories}
            categoryNames={categoryNames}
          />
          {/* <div className={`${styles.menu_left} navTest ${theme}`}>
            <ul className={`${styles.menu_left_ul}`}>
              {uniqueCategories.map((type) => (
                <li key={type} className={styles.menu_left_li}>
                  <Link
                    to={`/bloglist/${type}`}
                    className={styles.menu_left_link}
                  >
                    <span className={styles.text}>
                      {categoryNames[type] || type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Display filtered posts */}
        <div className={`${styles.blog_right} `}>
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`${styles.articles}  navTest ${theme}`}
            >
              <div className={styles.articles_left}>
                <img alt={post.metatitle} className={styles.img_articles} />
              </div>
              <div className={styles.articles_right}>
                <div className={styles.articles_right_block}>
                  <div className={styles.articles_right_category}>
                    <Link
                      to={`/bloglist/${post.type}`}
                      className={styles.category_link}
                    >
                      <span className={styles.category_link_text}>
                        {categoryNames[post.type] || post.type}++
                      </span>
                    </Link>
                  </div>
                  <div className={styles.date}>
                    <span>
                      {/* {new Date(post.createdAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })} */}
                    </span>
                  </div>
                  <div className={styles.header}>{post.textTitle}</div>
                  <div className={styles.text}>
                    <p className={styles.text_p}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(post.textPage),
                        }}
                      />
                    </p>
                  </div>
                  <div className={styles.button}>
                    <Link
                      to={`/bloglist/${post.type}/${post.id}`}
                      className={styles.button_link}
                    >
                      Подробнее+
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
