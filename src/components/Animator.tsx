import { cloneElement, useState, useEffect, useMemo } from "react";

interface AnimationProps {
  animation: string;
  duration: number;
  [x: string | number | symbol]: unknown;
}

interface AnimatorProps {
  component: JSX.Element;
  canReset?: boolean;
  animationProps: AnimationProps;
}

export default ({ component, canReset = true, animationProps }: AnimatorProps) => {
  const [isActive, setIsActive] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (canReset && reset) {
      setIsActive(true);
      setReset(false);
    }
    if (!canReset && isActive) {
      window.setTimeout(() => setIsActive(false), animationProps.duration);
    }
  }, [isActive, reset]);

  const handleOnClick = () => {
    if (canReset) {
      // In order to reset mid-animation
      // Remove animation styles -> render -> add styles -> render
      setIsActive(false);
      setReset(true);
    } else {
      setIsActive(true);
    }
  };

  const animationStyles = isActive ? { animation: animationProps.duration + "ms " + animationProps.animation } : {};

  return useMemo(
    () =>
      cloneElement(component, {
        ...component.props,
        ...{
          style: { ...animationStyles, ...component.props.style },
          onClick: () => {
            handleOnClick();
            if (component.props.onClick) component.props.onClick();
          },
        },
      }),
    [component, isActive]
  );
};
