import React from 'react';
import './Content.css';
import Card from '../Card/Card';

enum COLORS {
    WATERBLUE = '#69BFF5',
    ORANGE = '#F8AF06',
    PINK = '#E68383',
    NAVIBLUE = '#6979F5',
    GREEN = '#59D67F',
    PURPLE = '#B263E3',
};

interface wordData {
    id: number;
    user_id: number;
    word: string;
    mean: string;
    pronounce: string;
    genre: string;
    color: string;
}

const Content = () => {

    const dummyData: wordData[] = [
        {
            id: 1,
            user_id: 1,
            word: "Hello",
            mean: "こんにちは",
            pronounce: "ハロー",
            genre: "英語",
            color: "",
        },
        {
            id: 2,
            user_id: 1,
            word: "罹患する",
            mean: "「罹患」とは「病気にかかること」を意味する単語で、「罹患者」や「罹患率」という表現でよく用いられます",
            pronounce: "りかんする",
            genre: "漢字",
            color: COLORS.NAVIBLUE,
        },
        {
            id: 3,
            user_id: 1,
            word: "怒れる拳笑顔に当たらず",
            mean: "怒って振り上げた拳も、笑顔の相手には拍子抜けがして打ち下ろせないように、高圧的な態度で出てきた相手には、優しい態度で接するほうが効果があるという教え。",
            pronounce: "",
            genre: "",
            color: COLORS.PINK,
        },
        {
            id: 4,
            user_id: 2,
            word: "２番だょ",
            mean: "user_id: 2のデータ",
            pronounce: "",
            genre: "漢字",
            color: COLORS.ORANGE,
        },
        {
            id: 5,
            user_id: 2,
            word: "怒れる拳笑顔に当たらず",
            mean: "怒って振り上げた拳も、笑顔の相手には拍子抜けがして打ち下ろせないように、高圧的な態度で出てきた相手には、優しい態度で接するほうが効果があるという教え。",
            pronounce: "",
            genre: "",
            color: COLORS.GREEN,
        },
        {
            id: 4,
            user_id: 1,
            word: "２番だょ",
            mean: "user_id: 2のデータ",
            pronounce: "",
            genre: "漢字",
            color: COLORS.ORANGE,
        },
        {
            id: 5,
            user_id: 1,
            word: "怒れる拳笑顔に当たらず",
            mean: "怒って振り上げた拳も、笑顔の相手には拍子抜けがして打ち下ろせないように、高圧的な態度で出てきた相手には、優しい態度で接するほうが効果があるという教え。",
            pronounce: "",
            genre: "",
            color: COLORS.GREEN,
        },
        {
            id: 5,
            user_id: 1,
            word: "怒れる拳笑顔に当たらず",
            mean: "怒って振り上げた拳も、笑顔の相手には拍子抜けがして打ち下ろせないように、高圧的な態度で出てきた相手には、優しい態度で接するほうが効果があるという教え。",
            pronounce: "",
            genre: "",
            color: COLORS.GREEN,
        },
    ]


    return (
        <div className="content">
            <div className="word-list">
                {
                    dummyData.map((data) => {
                        return <Card word={data.word} mean={data.mean} color={data.color}></Card>
                    })
                }
            </div>
        </div>
    )
};

export default Content
