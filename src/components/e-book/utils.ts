type HandledText = {
  head: string;
  target: string;
  tail: string;
};

export default function handleTagInText(string: string): HandledText {
  const [head, target, tail] = string.split('>').map(str => {
    return str.slice(0, str.indexOf('<'));
  });
  return { head, target, tail };
}
