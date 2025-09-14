import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { LoginModal } from '../LoginModal/LoginModal';
import { Layout } from '../Layout/Layout';
import { ActionButton } from '../ActionButton/ActionButton';
import codemagicsVideo from '../../assets/codemagics.webm';
import theoryImage from '../../assets/theory.webp';
import pythonImage from '../../assets/python.webp';
import cloudImage from '../../assets/cloud.webp';
import tgPostImage from '../../assets/tg-post.jpg';
import tgLogo from '../../assets/tg-logo.png';
import { ReactComponent as TelegramIcon } from '../../assets/telegram.svg';
import {
  LandingContainer,
  HeroContainer,
  HeroSection,
  LeftColumn,
  RightColumn,
  Title,
  Subtitle,
  FeaturesContainer,
  FeatureSection,
  FeatureContent,
  FeatureImage,
  FeatureVideo,
  FeatureTitle,
  FeatureDescription,
  CurriculumContainer,
  CurriculumSection,
  ModulesList,
  ModuleCard,
  ModuleTitle,
  ModuleSubtitle,
  CurriculumContent,
  CurriculumHeader,
  CurriculumBody,
  CurriculumLeftSection,
  CurriculumRightSection,
  CurriculumTitle,
  LevelsCount,
  TopicsGrid,
  TopicTag,
  DemoLevelSkeletonWrapper,
  SkeletonMapContainer,
  SkeletonGameField,
  SkeletonCell,
  SkeletonEditorContainer,
  CloudsContainer,
  CloudImage,
  TelegramPostContainer,
  TelegramPostWidget,
  TelegramPostHeader,
  TelegramChannelInfo,
  TelegramAvatar,
  TelegramChannelDetails,
  TelegramChannelName,
  TelegramChannelHandle,
  TelegramPostContent,
  TelegramPostImage,
  TelegramPostTextContent,
  TelegramPostTitle,
  TelegramPostText,
  TelegramPostFooter,
  TelegramPostTime,
  TelegramChannelLink,
} from './styled';
import { Button } from '../Button/Button';

const DemoLevel = lazy(() =>
  import('../DemoLevel/DemoLevel').then((module) => ({ default: module.DemoLevel }))
);

const LandingPageDemoSkeleton = () => (
  <DemoLevelSkeletonWrapper>
    <SkeletonMapContainer>
      <SkeletonGameField>
        {Array(16).fill(null).map((_, index) => (
          <SkeletonCell key={index} />
        ))}
      </SkeletonGameField>
    </SkeletonMapContainer>
    <SkeletonEditorContainer>
    </SkeletonEditorContainer>
  </DemoLevelSkeletonWrapper>
);

const TelegramPost = () => (
  <TelegramPostContainer>
    <TelegramPostWidget>
      <TelegramPostHeader>
        <TelegramChannelInfo onClick={() => window.open('https://t.me/codemagics', '_blank')}>
          <TelegramAvatar>
            <img src={tgLogo} alt="Telegram Logo" />
          </TelegramAvatar>
          <TelegramChannelDetails>
            <TelegramChannelName>
              CodeMagics
            </TelegramChannelName>
            <TelegramChannelHandle>@codemagics</TelegramChannelHandle>
          </TelegramChannelDetails>
        </TelegramChannelInfo>
      </TelegramPostHeader>
      <TelegramPostContent>
        <TelegramPostImage>
          <img src={tgPostImage} alt="ChatGPT vs CodeMagics 第一关" />
        </TelegramPostImage>
        <TelegramPostTextContent>
          <TelegramPostTitle>
            <strong>ChatGPT</strong> vs <strong>CodeMagics</strong> 第一关
          </TelegramPostTitle>
          <TelegramPostText>
            我们请 OpenAI 最新的模型 —— GPT-5 —— 通过我们第一个模块的第一关。结果令人震惊...
          </TelegramPostText>
        </TelegramPostTextContent>
      </TelegramPostContent>
      <TelegramPostFooter>
        <TelegramPostTime>2 天前</TelegramPostTime>
        <TelegramChannelLink href="https://t.me/codemagics/14" target="_blank" rel="noopener noreferrer">
          在 Telegram 中阅读
        </TelegramChannelLink>
      </TelegramPostFooter>
    </TelegramPostWidget>
  </TelegramPostContainer>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [selectedModule, setSelectedModule] = React.useState(1);

  const handleContinuePlaying = () => {
    navigate('/game');
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    navigate('/game');
  };

  const modules = [
    {
      id: 1,
      title: '模块 1',
      subtitle: '第一步',
      levelsCountSpan: '23 个关卡',
      topics: [
        '认识平台',
        'Python 语法基础',
        '方法',
        '参数',
        '字符串',
        '注释',
        '变量',
        'while 循环',
        'if 表达式'
      ],
      isReady: true,
    },
    {
      id: 2,
      title: '模块 2',
      subtitle: '学习基础',
      levelsCountSpan: '25 个关卡',
      topics: [
        'for 循环',
        'if-else 表达式',
        '数据类型',
        '数学运算',
        '比较运算符',
        '逻辑运算符',
      ],
      isReady: false,
    },
    {
      id: 3,
      title: '模块 3',
      subtitle: '拓展知识',
      levelsCountSpan: '30 个关卡',
      topics: [
        '函数',
        '列表',
        '元组',
        '字典',
        '递归',
      ],
      isReady: false,
    }
  ];

  const selectedModuleData = modules.find(module => module.id === selectedModule);

  return (
    <Layout isHeaderTransparent showAutoLogin={false}>
      <LandingContainer>
        <HeroContainer>
          <CloudsContainer>
            <CloudImage 
              src={cloudImage}
              alt="云"
              size={250}
              top="2%"
              left="7%"
              opacity={0.7}
              direction="horizontal"
              duration={12}
              delay="0s"
            />
            <CloudImage 
              src={cloudImage}
              alt="云"
              size={350}
              top="12%"
              left="75%"
              opacity={0.7}
              direction="horizontal"
              duration={14}
              delay="4s"
            />
            <CloudImage 
              src={cloudImage}
              alt="云"
              size={500}
              top="50%"
              left="40%"
              opacity={0.7}
              direction="vertical"
              duration={8}
              delay="2s"
            />
          </CloudsContainer>
          <HeroSection>
            <LeftColumn>
              <ActionButton onClick={() => window.open('https://t.me/codemagics', '_blank')} variant="secondary" icon={<TelegramIcon />}>我们的 Telegram 频道</ActionButton>
              <Title>用于儿童编程学习的有趣游戏</Title>
              <Subtitle>在浏览器中直接使用——无需安装。从零开始学习，适合 10 岁以上儿童。</Subtitle>
              <Button
                disabled={false}
                shadowColor="#1B4B82"
                frontColor="#2D7CD4"
                alt={isAuthenticated ? '继续学习' : '免费试用'}
                onClick={handleContinuePlaying}
                width={300}
                height={50}
                shadowHeight={15}
                fontFamily="Montserrat"
              />
            </LeftColumn>
            <RightColumn>
              <React.Suspense fallback={<LandingPageDemoSkeleton />}>
                <DemoLevel />
              </React.Suspense>
            </RightColumn>
          </HeroSection>
        </HeroContainer>

        <FeaturesContainer>
          <FeatureSection>
            <FeatureContent>
              <FeatureTitle>学习——以&nbsp;游戏的形式</FeatureTitle>
              <FeatureDescription>
                孩子通过编写代码来操控角色、解谜并收集奖励——
                学习过程变成一场精彩的游戏。
              </FeatureDescription>
            </FeatureContent>
            <FeatureVideo>
              <video 
                src={codemagicsVideo} 
                alt="少儿编程学习游戏界面"
                autoPlay 
                loop 
                muted
                playsInline
              />
            </FeatureVideo>
          </FeatureSection>

          <TelegramPost />

          <FeatureSection>
            <FeatureContent>
              <FeatureTitle>编程入门的理想选择</FeatureTitle>
              <FeatureDescription>
              每个关卡都从必要的理论开始——我们用通俗易懂的语言和直观示例讲解新概念。
              </FeatureDescription>
            </FeatureContent>
            <FeatureImage>
              <img src={theoryImage} alt="少儿编程理论内容示例" />
            </FeatureImage>
          </FeatureSection>

          <FeatureSection>
            <FeatureContent>
              <FeatureTitle>Python——No.1 语言</FeatureTitle>
              <FeatureDescription>
              我们教授世界上最流行的编程语言。Python 被应用于 Yandex 和 Google，可用于开发网站、游戏和人工智能。
              </FeatureDescription>
            </FeatureContent>
            <FeatureImage>
              <img src={pythonImage} alt="Python 编程语言" />
            </FeatureImage>
          </FeatureSection>

          <CurriculumContainer>
            <FeatureTitle>
              课程大纲
            </FeatureTitle>
            <CurriculumSection>
              <ModulesList>
                {modules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    isActive={selectedModule === module.id}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <ModuleTitle isActive={selectedModule === module.id}>
                      {module.title}
                    </ModuleTitle>
                    <ModuleSubtitle isActive={selectedModule === module.id}>
                      {module.subtitle}
                    </ModuleSubtitle>
                  </ModuleCard>
                ))}
              </ModulesList>

              <CurriculumContent>
                <CurriculumHeader>
                  <CurriculumTitle>{selectedModuleData?.title}</CurriculumTitle>
                </CurriculumHeader>

                <CurriculumBody>
                  <CurriculumLeftSection>
                    <TopicsGrid>
                      {selectedModuleData?.topics.map((topic, index) => (
                        <TopicTag key={index}>{topic}</TopicTag>
                      ))}
                    </TopicsGrid>
                  </CurriculumLeftSection>

                  <CurriculumRightSection>
                    {selectedModuleData?.isReady ? (
                      <>
                        <LevelsCount>{selectedModuleData?.levelsCountSpan}</LevelsCount>
                        <ActionButton onClick={handleContinuePlaying} size="large">
                          {isAuthenticated ? '继续学习' : '开始编程'}
                        </ActionButton>
                      </>
                    ) : (
                      <>
                        <LevelsCount>开发中</LevelsCount>
                        <ActionButton onClick={() => window.open('https://t.me/codemagics', '_blank')} size="large">
                          在 Telegram 关注
                        </ActionButton>
                      </>
                    )}
                  </CurriculumRightSection>
                </CurriculumBody>
              </CurriculumContent>
            </CurriculumSection>
          </CurriculumContainer>
        </FeaturesContainer>

        {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)}
            onSuccess={handleLoginSuccess}
          />
        )}
      </LandingContainer>
    </Layout>
  );
}; 