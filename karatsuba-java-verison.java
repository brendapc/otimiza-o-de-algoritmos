import java.util.ArrayList;
import java.util.List;

class KaratsubaCalculator {

    List<String> divideIntoThreeParts(String arg) {
        int partSize = (int) Math.ceil(arg.length() / 3.0);
        List<String> parts = new ArrayList<>();

        for (int i = 0; i < arg.length(); i += partSize) {
            parts.add(arg.substring(i, Math.min(i + partSize, arg.length())));
        }

        return parts;
    }

    String sum(String a, String b) {
        int carry = 0;
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < Math.max(a.length(), b.length()) || carry > 0; i++) {
            int digitA = i < a.length() ? Character.getNumericValue(a.charAt(a.length() - 1 - i)) : 0;
            int digitB = i < b.length() ? Character.getNumericValue(b.charAt(b.length() - 1 - i)) : 0;
            int sum = digitA + digitB + carry;

            result.insert(0, sum % 10);
            carry = sum / 10;
        }

        return result.toString();
    }

    String multiply(String s, String p) {
        if (s.length() == 1 && p.length() == 1) {
            return String.valueOf(Integer.parseInt(s) * Integer.parseInt(p));
        }

        List<String> a = divideIntoThreeParts(s);
        List<String> b = divideIntoThreeParts(p);

        int[] e = {
                s.length() - a.get(0).length(),
                s.length() - (a.get(0).length() + (a.size() > 1 ? a.get(1).length() : 0)),
                0
        };
        int[] f = {
                p.length() - b.get(0).length(),
                p.length() - (b.get(0).length() + (b.size() > 1 ? b.get(1).length() : 0)),
                0
        };

        String result = "0";

        for (String aValue : a) {
            for (String bValue : b) {
                result = sum(
                        result,
                        multiply(aValue, bValue) + "0".repeat(e[a.indexOf(aValue)] + f[b.indexOf(bValue)])
                );
            }
        }

        return result;
    }

    String calculate(String a, String b) {
        return multiply(a, b);
    }

    public static void main(String[] args) {
        KaratsubaCalculator calculator = new KaratsubaCalculator();
        String result = calculator.calculate(args[0], args[1]);
        System.out.println(result);
    }
}
